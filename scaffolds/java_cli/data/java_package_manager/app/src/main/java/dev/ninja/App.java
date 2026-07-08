package dev.ninja;

import java.nio.file.Path;

import javax.xml.parsers.DocumentBuilderFactory;

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import dev.ninja.lib.Arguments;
import dev.ninja.lib.DependenciesLib;

/**
 * Hello world!
 */
public class App {
    public static void main(String[] args) {
        Path cwd = Path.of("").toAbsolutePath();
        Path xmlPath = cwd.resolve("../../app/pom.xml").normalize();

        Document document = getDocument(xmlPath);
        Element deps = getDeps(document);

        Arguments data = extractData(args);

        Element existingDep = DependenciesLib.findDependency(deps, data.getGroup(), data.getArtifact());

        if (existingDep == null) {
            DependenciesLib.addDependency(document, deps, data);
            System.out.println(data.getGroup() + ":" + data.getArtifact() + " added ✅");

        } else {
            DependenciesLib.removeDependency(deps, existingDep);
            System.out.println(data.getGroup() + ":" + data.getArtifact() + " removed ❌");
        }

        try {
            DependenciesLib.removeWhitespace(document);
            DependenciesLib.save(document, xmlPath);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static Arguments extractData(String[] args) {
        String groupAndArtifact = args[0];
        String version = args[1];
        String[] parts = groupAndArtifact.split(":");
        String group = parts[0];
        String artifact = parts[1];
        String scope = args.length > 2 ? args[2] : "d";

        return new Arguments(group, artifact, version, scope);
    }

    public static Document getDocument(Path xmlPath) {

        try {

            Document document = DocumentBuilderFactory
                    .newInstance()
                    .newDocumentBuilder()
                    .parse(xmlPath.toFile());

            return document;
        } catch (Exception e) {
            e.printStackTrace();

            return null;
        }

    }

    public static Element getDeps(Document document) {

        Element project = document.getDocumentElement();
        NodeList children = project.getChildNodes();

        for (int i = 0; i < children.getLength(); i++) {
            Node node = children.item(i);

            if (node.getNodeType() == Node.ELEMENT_NODE &&
                    node.getNodeName().equals("dependencies")) {

                Element dependencies = (Element) node;

                return dependencies;
            }
        }

        return null;
    }
}
